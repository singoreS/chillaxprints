// Shopify integration removed - stub file to maintain type compatibility

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    descriptionHtml: string;
    handle: string;
    productType: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
          image?: {
            url: string;
            altText: string | null;
          };
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

export interface ShopifyCollection {
  id: string;
  title: string;
  description: string;
  handle: string;
  image?: {
    url: string;
    altText: string | null;
  };
  products?: {
    edges: ShopifyProduct[];
  };
}

export async function getProducts(_count: number = 20, _query?: string): Promise<ShopifyProduct[]> {
  return [];
}

export async function searchProducts(_searchQuery: string, _count: number = 20): Promise<ShopifyProduct[]> {
  return [];
}

export async function getProductByHandle(_handle: string): Promise<ShopifyProduct['node'] | null> {
  return null;
}

export async function getCollectionByHandle(_handle: string): Promise<ShopifyCollection | null> {
  return null;
}

export async function getAllCollections(): Promise<ShopifyCollection[]> {
  return [];
}

export async function createStorefrontCheckout(_items: any[]): Promise<string> {
  throw new Error('Checkout is not available - Shopify integration removed');
}
