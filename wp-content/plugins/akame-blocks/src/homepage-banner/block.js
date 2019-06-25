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
const { RichText } = wp.editor;
const TEMPLATE = [
	['core/heading', {className:'welcome-banner__title', placeholder: 'Banner Title'}],
  ['core/paragraph', { className:'welcome-banner__text', placeholder: 'Enter short welcome messege...' }]
];
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
registerBlockType( 'akame-blocks/homepage-banner', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Homepage Banner' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'akame-blocks' ),
	],
	description: __( 'Block to generate Welcome Banner' ),

	attributes: {

		button: {
			type: 'string',
			default: 'About Us',
			selector: 'a',
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

		return (
			<div className={ className }>
				<p>This block creates Banner component.</p>
				< InnerBlocks
					template={TEMPLATE}
				/>
				<label>Button:</label>
				<RichText
					tagName ="a"
					default="About Us"
					className="button button--alt"
					value={attributes.button}

					onChange= {function (myText) {
						setAttributes({
							button: myText
						});
					}}
				/>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save ({ attributes, className, setAttributes }) {
		return (
			<section className="welcome-banner">
				<div className="l-container">
					<div className="welcome-banner__container">
						<InnerBlocks.Content />
						<RichText.Content
							tagName ='a'
							className='button button--alt'
							value={ attributes.button }
						/>
					</div>
			</div>
		</section>
		);
	},
} );
