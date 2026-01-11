import { useParams, Link, Navigate } from "react-router-dom";
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight, Share2, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { getArticleBySlug, getRelatedArticles, BlogArticle } from "@/data/blogArticles";
import ReactMarkdown from "react-markdown";

const BlogArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const relatedArticles = article ? getRelatedArticles(article.id, 3) : [];

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareUrl = `https://www.chillaxprints.com/blog/${article.slug}`;
  const shareTitle = encodeURIComponent(article.title);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  // Schema for BlogPosting
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.image,
    "datePublished": article.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "ChillaxPrints"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ChillaxPrints",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.chillaxprints.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": shareUrl
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={article.title}
        description={article.excerpt}
        keywords={article.tags.join(", ")}
        canonicalUrl={`/blog/${article.slug}`}
        ogImage={article.image}
        ogType="article"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container px-4 md:px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-foreground truncate">{article.title}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="container px-4 md:px-6 pb-8">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au blog
            </Link>

            <Badge className="mb-4">{article.category}</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(article.publishedAt)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {article.readTime} min de lecture
              </span>
              <span>Par {article.author}</span>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden mb-8 shadow-[var(--shadow-elegant)]">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm text-muted-foreground">Partager :</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleShare}
                  className="h-9 w-9"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="h-9 w-9"
                >
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="h-9 w-9"
                >
                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="container px-4 md:px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:marker:text-primary prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </article>

            <Separator className="my-10" />

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-10">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* CTA */}
            <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-2">
              <CardContent className="p-6 md:p-8 text-center">
                <h3 className="text-xl md:text-2xl font-bold mb-3">
                  Découvrez Notre Collection
                </h3>
                <p className="text-muted-foreground mb-6">
                  Des vêtements humoristiques et confortables pour les amateurs de lazy lifestyle
                </p>
                <Button asChild size="lg">
                  <Link to="/boutique">
                    Voir la Boutique <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container px-4 md:px-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Articles Similaires
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                {relatedArticles.map((relatedArticle, index) => (
                  <RelatedArticleCard key={relatedArticle.id} article={relatedArticle} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

interface RelatedArticleCardProps {
  article: BlogArticle;
  index: number;
}

const RelatedArticleCard = ({ article, index }: RelatedArticleCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Link 
      to={`/blog/${article.slug}`}
      className="group animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Card className="h-full overflow-hidden border-2 hover:border-primary hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <Badge className="absolute top-3 left-3">{article.category}</Badge>
        </div>
        <CardHeader className="pb-2">
          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(article.publishedAt)}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogArticlePage;
