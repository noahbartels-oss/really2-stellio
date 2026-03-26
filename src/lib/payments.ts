export function getDocumentTypesForProduct(
  productType: string
): ("CV" | "COVER_LETTER" | "INTERVIEW_COACHING")[] {
  switch (productType) {
    case "CV_SINGLE":
      return ["CV"];
    case "COVER_LETTER_SINGLE":
      return ["COVER_LETTER"];
    case "INTERVIEW_SINGLE":
      return ["INTERVIEW_COACHING"];
    case "STARTER_BUNDLE":
      return ["CV", "COVER_LETTER"];
    case "PRO_BUNDLE":
    case "PREMIUM":
      return ["CV", "COVER_LETTER", "INTERVIEW_COACHING"];
    default:
      return [];
  }
}
