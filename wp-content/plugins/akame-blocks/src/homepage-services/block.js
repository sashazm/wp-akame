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
const { InnerBlocks } = wp.editor;
const {
	InspectorControls,
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
registerBlockType( 'akame-blocks/homepage-services', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Homepage Our Services' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('akame-blocks')
	],
	description: __('Block to generate Our Services Section, use with Teaser block for images'),
	attributes: {

		sectionTitle: {
		},
		sectionParagraph: {
			type: 'array',
			source: 'children',
			selector: 'p',
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

	edit: function( props ) {
		const { className, setAttributes } = props;
		const { attributes } = props;
		        // we create a function that will take the changes from RichText
        // and update the attributes
		return [

			<InspectorControls>
			{/* Later, when we have customizable options we will add stuff here! */}
			<div
					style={{
							padding: '1em 0',
					}}
			>
					Options
			</div>
			</InspectorControls>,

			<div className={ props.className }>
				<label>Text for the title of the section</label>
				<RichText
					tagName = "h1"
					placeholder = "Enter Section Title here!"
					value = {attributes.sectionTitle}
				// update text to the user's input
					onChange = {function (value) {
						setAttributes({
							sectionTitle: value
						});
					}}
				/>

				<label>Text just below the Section Title</label>
				<RichText
					tagName ="p"
					placeholder="Enter your text here!"
					value={attributes.sectionParagraph}

					onChange= {function (value) {
						setAttributes({
							sectionParagraph: value
						});
					}}
				/>

				<InnerBlocks/>
			</div>

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
	save: function( props ) {
		const { className, setAttributes } = props;
		const { attributes } = props;
		return (
			<section>
				<div className="l-container">
					<header>
						<div className="l-vertical-space u-centered">
							<RichText.Content
								tagName = { 'h1' }
								value = { attributes.sectionTitle }
							/>
							<RichText.Content
								tagName = { 'p' }
								value={attributes.sectionParagraph}
							/>
						</div>
					</header>
					<div className="services">
						<InnerBlocks.Content/>
					</div>
				</div>
			</section>
		);
	},
});
