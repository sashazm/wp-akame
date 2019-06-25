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
const { RichText } = wp.editor;
const { InnerBlocks } = wp.editor;
const HEADING = [
	['core/heading', {placeholder: 'Section Title'}],
	['core/paragraph', { className:'call-to-action__text', placeholder: 'Enter a short messege...' }]
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
registerBlockType( 'akame-blocks/call-to-action', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Akame Call To Action' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'akame-blocks' ),
	],
	description: __( 'Block to generate Call To Action section' ),
	attributes: {

		button: {
			type: 'string',
			default: 'Book An Appointment',
			selector: 'a',
		},

		buttonAlt: {
			type: 'string',
			default: 'Contact Us',
			selector: 'a',
		}
	},


	edit ({ attributes, className, setAttributes }) {

		return (

			<div className={className}>
				<p>Call To Action Block</p>

				< InnerBlocks
					template={HEADING}
				/>

				<label>Button:</label>
				<RichText
					tagName ="a"
					default="Book An Appointment"
					className="button button--alt call-to-action__button"
					value={attributes.button}

					onChange= {function (myText) {
						setAttributes({
							button: myText
						});
					}}
				/>

				<label>Button:</label>
				<RichText
					tagName ="a"
					default="Contact Us"
					className="button"
					value={attributes.buttonAlt}

					onChange= {function (myText) {
						setAttributes({
							buttonAlt: myText
						});
					}}
				/>
			</div>
		);
	},

		// // save(): built-in function renders the site markup of the block
	save ({ attributes, className, setAttributes }) {
		return (
			<section className="section-highlight call-to-action">
				<div className="l-container call-to-action__body">
					{/* Title and text for the section starts here */}
					<InnerBlocks.Content />

					{/* Buttons */}
					<div>
					<RichText.Content
						tagName ='a'
						className='button button--alt call-to-action__button'
						value={ attributes.button }
					/>

					<RichText.Content
						tagName ='a'
						className='button'
						value={ attributes.buttonAlt }
					/>
					</div>
				</div>
		</section>
		);
	},
} );
