    /**
 * Semantic Typography Scale
 * -------------------------
 * Naming Pattern:
 *    <role><size>
 *
 * Roles:
 *  - display: Large hero/headline text
 *  - heading: Section/page headers
 *  - title: Card titles / smaller headers
 *  - label: Buttons, tabs, form labels
 *  - body: Paragraph text
 *  - caption: Helper text / micro text
 */

export const typographyVariants = {
  fontFamily:  "Poppins, sans-serif",
  /* -------------------------
     Display (Very Large Headings)
     ------------------------- */
  display26: {
    fontSize: "1.625rem",
    fontWeight: 600,
    lineHeight: "1.9rem",
  },
  display24: {
    fontSize: "1.5rem",
    fontWeight: 600,
    lineHeight: "1.8rem",
  },

  /* -------------------------
     Headings (Section Titles)
     ------------------------- */
  heading20: {
    fontSize: "1.25rem",
    fontWeight: 600,
    lineHeight: "1.5rem",
  },
  heading18: {
    fontSize: "1.125rem",
    fontWeight: 600,
    lineHeight: "1.5rem",
  },
  heading16: {
    fontSize: "1rem",
    fontWeight: 600,
    lineHeight: "1.4rem",
  },
  heading14: {
    fontSize: "0.875rem",
    fontWeight: 600,
    lineHeight: "1.1rem",
  },

  /* -------------------------
     Titles (Card headings, UI subtitles)
     ------------------------- */
  title20: {
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: "1.5rem",
  },
  title18: {
    fontSize: "1.125rem",
    fontWeight: 500,
    lineHeight: "1.25rem",
  },
  title16: {
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: "1.3rem",
  },
  title14: {
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: "1.1rem",
  },
  title12: {
    fontSize: "0.75rem",
    fontWeight: 500,
    lineHeight: "0.9rem",
  },

  /* -------------------------
     Body Text (Paragraphs)
     ------------------------- */
  body20: {
    fontSize: "1.25rem",
    fontWeight: 400,
    lineHeight: "1.6rem",
  },
  body16: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: "1.4rem",
  },
  body14: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1.25rem",
  },
  body12: {
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: "0.9rem",
  },

  /* -------------------------
     Caption / Micro text
     ------------------------- */
  caption10: {
    fontSize: "0.625rem",
    fontWeight: 400,
    lineHeight: "0.75rem",
  },
  caption10Medium: {
    fontSize: "0.625rem",
    fontWeight: 500,
    lineHeight: "0.75rem",
  },
  caption10Bold: {
    fontSize: "0.625rem",
    fontWeight: 600,
    lineHeight: "0.75rem",
  },
};
