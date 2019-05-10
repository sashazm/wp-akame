/**
 * BLOCK: akame-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
	RichText,
	MediaUpload
} = wp.editor;
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
registerBlockType( 'akame-blocks/homepage-intro', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Homepage Intro ' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	description: __( 'Block to generate three columns with title, slogan, image, text, button' ),

	attributes: {
		sectionTitle: {
		},

		sectionFrontTitle: {
			source: 'html',
			selector: 'h1',
		},

		imgUrl: {
			type: 'string',
			default: 'http://placehold.it/100',
		},

		textTitle: {
		},

		text: {
		},

		sectionParagraph: {
			type: 'array',
			source: 'children',
			selector: 'p',
		},

		sectionButton: {
			className: 'button button--alt'
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
		// we create a function that will take the changes from RichText
		// and update the attributes
		const changeSectionFrontTitle = (sectionFrontTitle) => {
			setAttributes({ sectionFrontTitle });
		}

		const changeSectionParagraph = (sectionParagraph) => {
			setAttributes({ sectionParagraph });
		}

		const changeSectionTitle = (sectionTitle) => {
			setAttributes({ sectionTitle });
		}

		const selectImage = (value) => {
			setAttributes({
				imgUrl: value.sizes.full.url,
			})
		}

		const changeTextTitle = (textTitle) => {
			setAttributes({ textTitle });
		}

		const changeText = (text) => {
			setAttributes({ text });
		}

		const changeSectionButton = (sectionButton) => {
			setAttributes({ sectionButton });
		}

		return (
			<div className={ className }>
				<p>Homepage Intro Block</p>
				<RichText
					tagName="h1"
					placeholder="Title for the foreground of the first column."
					value={attributes.sectionFrontTitle}
					onChange={changeSectionFrontTitle}
				/>

				<label>Text just below the title in the foreground of the first column:</label>
				<RichText
					tagName="p"
					placeholder="Enter your text here!"
					value={attributes.sectionParagraph}
					onChange={changeSectionParagraph}
				/>

				<label>Large text in the background of the first column:</label>
				<RichText
					tagName ="span"
					placeholder="Enter Section Title here!"
					value={attributes.sectionTitle}
					onChange={changeSectionTitle}
					/>

					<div className={className}>
						<label>Image for the second column:</label>
							<div className="media">
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
						</div>


				<label>Text for the third column:</label>
				<RichText
					tagName="h2"
					placeholder="Enter message title here!"
					value={attributes.textTitle}
					onChange={changeTextTitle}
				/>

				<RichText
					tagName = "p"
					placeholder = "Enter paragraph text here!"
					value={attributes.text}

					onChange={changeText}
				/>

				<label>Text for the button:</label>
				<RichText
					tagName="a"
					placeholder="Your Text"
					value={attributes.sectionButton}

					onChange={changeSectionButton}
				/>
			</div>
		);
	},

	// // save(): built-in function renders the site markup of the block
	save ({attributes, className}) {
		return (
			<section>
				<div className="l-container l-vertical-space intro">
					<header className="intro__overlap">
						<div className="intro__front">
							<RichText.Content
								tagName ="h1"
								className ="front__title"
								value={attributes.sectionFrontTitle}
							/>
							<RichText.Content
								tagName="p"
								value={attributes.sectionParagraph}
							/>
						</div>
						<span className="intro__back">{attributes.sectionTitle}</span>
					</header>

					<div className ="intro__image">
						<img src={attributes.imgUrl}/>
					</div>

					<div className ="intro__textbox">
						<RichText.Content
							tagName ="h2"
							className = {"intro__title"}
							value ={attributes.textTitle}
						/>
						<RichText.Content
							tagName ="p"
							className={"intro__text"}
							value={attributes.text}
						/>

						<RichText.Content
							tagName="a"
							value={attributes.sectionButton}
							className={"button button--alt"}
						/>
					</div>
				</div>
			</section>
		);
	},
});
