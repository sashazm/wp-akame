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
registerBlockType( 'akame-blocks/latest-blogposts', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( ' Akame recent blogposts ' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	description: __( 'Block to generate Latest News component' ),

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

		const changeIntro = (sectionIntro) => {
			// using some nice js features instead of typing
			// { sectionTitle: sectionTitle }
			setAttributes({ sectionIntro });
		}

		return [
			<div className={className}>
				<p>This block will automatically display three of the most recent blogposts, give a title for the section and a short intro.</p>

				{/* Title and text for the section starts here */}
				<RichText
					tagName="h1"
					placeholder="Enter Title here"
					value={attributes.sectionTitle}
					onChange={changeTitle}
				/>

				<RichText
					tagName="p"
					placeholder="Enter short intro message here"
					value={attributes.sectionIntro}
					onChange={changeIntro}
				/>

			</div>
		];
	},

	save ({ attributes, className }) {
		return null;
	}

	// Save function is handled by PHP.
});
