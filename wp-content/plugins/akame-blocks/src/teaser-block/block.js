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
registerBlockType( 'akame-blocks/teaser-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Teaser Block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('akame-blocks')
	],
	description: __('Block to generate a Teaser with image title and text'),
	attributes: {

		bodyContent: {
			source: 'html',
			selector: 'p',
		},

		heading: {
			source: 'html',
			selector: 'h4',
		},

		imgUrl: {
			type: 'string',
			default: 'http://placehold.it/100'
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
		const changeBodyContent = (bodyContent) => {
			setAttributes({ bodyContent });
		}

		const changeHeading = (heading) => {
			setAttributes({ heading });
		}

		const selectImage = (value) => {
			setAttributes({
				imgUrl: value.sizes.full.url,
			})
		}


		return [

			<div className={className}>
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
				<div className="copy">
					<RichText
						className="copy-hd"
						tagName="h4"
						placeholder="Enter your heading"
						value={attributes.heading}
						onChange={changeHeading}
					/>
					{/* Content is replaced by this guy.
					We determin the class name and the html tag that
					we want it to show as. */}
					<RichText
						className="copy-bd"
						tagName="p"
						placeholder="Enter your text here"
						value={attributes.bodyContent}
						onChange={changeBodyContent}
					/>
				</div>
			</div>,

		];
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save ({ attributes, className }) {
		return (
			<article className={`services__box`}>
				<img src={attributes.imgUrl}/>
				<RichText.Content
					tagName="h4"
					value={attributes.heading}
				/>

 				<RichText.Content
 					tagName="p"
 					value={attributes.bodyContent}
				/>
			</article>
		);
	},
});
