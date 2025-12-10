// Liste des handles de produits personnalisables
// Ajoute les handles des produits que tu veux rendre personnalisables
export const CUSTOMIZABLE_PRODUCT_HANDLES = [
  "cute-teddy-bear-tee-adorable-graphic-t-shirt-perfect-for-kids-adults-gift-for-any-occasion-fun-casual-wear",
  // Ajoute d'autres handles ici quand tu le souhaites
];

export const isProductCustomizable = (handle: string): boolean => {
  return CUSTOMIZABLE_PRODUCT_HANDLES.includes(handle);
};
