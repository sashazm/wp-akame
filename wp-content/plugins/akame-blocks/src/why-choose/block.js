/**
 * BLOCK: akame-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

// export { createSlotFill, Slot, Fill, Provider as SlotFillProvider } from './slot-fill';
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText } = wp.editor;
const { MediaUpload } = wp.editor;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'akame-blocks/why-choose', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( ' Why Choose Us ' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	description: __( 'Block to generate Why Choose Us component' ),

	attributes: {

		sectionTitle: {
			source: 'html',
			selector: 'h1'
		},

		sectionParagraph: {
			type: 'array',
			source: 'children',
			selector: 'p'
		},

		imgUrl: {
			type: 'string',
			default: 'http://placehold.it/500',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},

		listContent: {
			type: 'string',
			source: 'html',
			selector: 'ul',
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit ({ attributes, className, setAttributes }) {

		const changeTitle = (sectionTitle) => {
			// using some nice js features instead of typing
			// { sectionTitle: sectionTitle }
			setAttributes({ sectionTitle });
		}

		const selectImage = (value) => {
			setAttributes({
				imgUrl: value.sizes.full.url,
			})
		}

		return [
			<div className={className}>
				<p>Why Choose Us Block</p>

				{/* Section Image upload */}
				<div className={`media`}>
					<MediaUpload
						onSelect={selectImage}
						render={ ({open}) => {
							return (
								<button onClick={open}>
									<img
										src={attributes.imgUrl}
									/>
								</button>
							);
						}}
					/>
				</div>

				{/* Title and text for the section starts here */}
				<div>
					<label>Title for this section</label>
					<RichText
						tagName="h1"
						placeholder="Enter Title here"
						value={attributes.sectionTitle}
						onChange={changeTitle}
					/>

					<label>Text just below the Main Title:</label>
					<RichText
						tagName ="p"
						placeholder="Enter your text here!"
						value={attributes.sectionParagraph}

						onChange= {function (myText) {
							setAttributes({
								sectionParagraph: myText
							});
						}}
					/>
				</div>

				{/* Unordered list for Section Check List*/}
				<div>
					<label>create unordered list:</label>
					<RichText
						tagName ="ul"
						multiline='li'
						className="why-choose__list"
						onChange={function onChangeContent(ListText) {
							// Strip any <i> tags before setting the attribute.
							ListText = ListText.replace(/<i[^>]+>(<\/i>){0,1}/g, '')
							setAttributes({
								listContent: ListText
							})
						}}
						value={attributes.listContent}
					/>
				</div>

			</div>,
		];
	},

	// // save(): built-in function renders the site markup of the block
	save ({ attributes, className, setAttributes }) {

		const createListMarkup = (list) => {
			return list.replace(/<li>(?!<i)/g, '<li><i class="fas fa-check checkbox checkbox__check checkbox__check--alt"></i>');
		}

		return (
			<section class="l-vertical-space section-highlight">
				<div class="l-container why-choose">
					{/* Section Image */}
					<div>
						<img class="why-choose__image" src={attributes.imgUrl}/>
					</div>

					{/* Title and text for the section starts here */}
					<section>
						<header>
							<RichText.Content
								tagName = 'h1'
								value = { attributes.sectionTitle }
							/>
							<RichText.Content
								tagName = 'p'
								value= { attributes.sectionParagraph }
							/>
						</header>

						{/* Unordered list for Section Check List*/}
						<RichText.Content
							tagName="ul"
							multiline="li"
							className="why-choose__list"
							value={createListMarkup(attributes.listContent)}
						/>

					</section>
				</div>
			</section>
		);
	},
});
