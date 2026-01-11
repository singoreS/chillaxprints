import { Helmet } from 'react-helmet-async';

interface OrganizationSchemaProps {
  type: 'Organization';
}

interface ProductSchemaProps {
  type: 'Product';
  name: string;
  description: string;
  image: string;
  price: string;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  brand?: string;
  sku?: string;
  reviewCount?: number;
  ratingValue?: number;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  type: 'BreadcrumbList';
  items: BreadcrumbItem[];
}

interface WebSiteSchemaProps {
  type: 'WebSite';
}

interface CollectionPageSchemaProps {
  type: 'CollectionPage';
  name: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  type: 'FAQPage';
  items: FAQItem[];
}

type StructuredDataProps =
  | OrganizationSchemaProps
  | ProductSchemaProps
  | BreadcrumbSchemaProps
  | WebSiteSchemaProps
  | CollectionPageSchemaProps
  | FAQSchemaProps;

const BASE_URL = 'https://www.chillaxprints.com';

const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ChillaxPrints',
  alternateName: 'Lazy Legend',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description: 'Vêtements confortables et humoristiques pour ceux qui assument leur côté lazy. T-shirts, hoodies, bonnets et chaussures avec des designs originaux.',
  foundingDate: '2024',
  sameAs: [
    'https://www.instagram.com/chillaxprints',
    'https://www.pinterest.com/chillaxprints',
    'https://www.linkedin.com/company/chillaxprints',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'contact@chillaxprints.com',
    availableLanguage: ['French'],
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'FR',
  },
});

const getWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ChillaxPrints',
  alternateName: 'Lazy Legend',
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/boutique?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

const getProductSchema = (props: ProductSchemaProps) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: props.name,
  description: props.description,
  image: props.image,
  brand: {
    '@type': 'Brand',
    name: props.brand || 'ChillaxPrints',
  },
  sku: props.sku,
  offers: {
    '@type': 'Offer',
    url: `${BASE_URL}/produit/${props.sku}`,
    priceCurrency: props.currency || 'EUR',
    price: props.price,
    availability: `https://schema.org/${props.availability || 'InStock'}`,
    seller: {
      '@type': 'Organization',
      name: 'ChillaxPrints',
    },
    shippingDetails: {
      '@type': 'OfferShippingDetails',
      shippingRate: {
        '@type': 'MonetaryAmount',
        value: '0',
        currency: 'EUR',
      },
      shippingDestination: {
        '@type': 'DefinedRegion',
        addressCountry: 'FR',
      },
      deliveryTime: {
        '@type': 'ShippingDeliveryTime',
        handlingTime: {
          '@type': 'QuantitativeValue',
          minValue: 1,
          maxValue: 3,
          unitCode: 'DAY',
        },
        transitTime: {
          '@type': 'QuantitativeValue',
          minValue: 2,
          maxValue: 5,
          unitCode: 'DAY',
        },
      },
    },
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'FR',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: 14,
      returnMethod: 'https://schema.org/ReturnByMail',
      returnFees: 'https://schema.org/FreeReturn',
    },
  },
  ...(props.reviewCount && props.ratingValue
    ? {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: props.ratingValue,
          reviewCount: props.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      }
    : {}),
});

const getBreadcrumbSchema = (props: BreadcrumbSchemaProps) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: props.items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${BASE_URL}${item.url}`,
  })),
});

const getCollectionPageSchema = (props: CollectionPageSchemaProps) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: props.name,
  description: props.description,
  url: `${BASE_URL}/boutique`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'ChillaxPrints',
    url: BASE_URL,
  },
});

const getFAQSchema = (props: FAQSchemaProps) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: props.items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});

export const StructuredData = (props: StructuredDataProps) => {
  let schema: object;

  switch (props.type) {
    case 'Organization':
      schema = getOrganizationSchema();
      break;
    case 'WebSite':
      schema = getWebSiteSchema();
      break;
    case 'Product':
      schema = getProductSchema(props);
      break;
    case 'BreadcrumbList':
      schema = getBreadcrumbSchema(props);
      break;
    case 'CollectionPage':
      schema = getCollectionPageSchema(props);
      break;
    case 'FAQPage':
      schema = getFAQSchema(props);
      break;
    default:
      return null;
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default StructuredData;
