import { notFound } from "next/navigation";
import { Suspense, useEffect } from "react";
import { getBySlug } from "@/lib/articles";
import { Article } from "../../../../components/Article";
import { CommentSection } from "../../../../components/CommentSection";
import { RelatedArticles } from "../../../../components/RelatedArticles";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default async function ArticlePage({ params: { slug } }: ArticlePageProps) {
  const article = await getBySlug(slug);
  const recordView = useMutation(api.articles.recordView);


  if (!article) notFound();

  useEffect(() => {
    if (article?._id) {
      recordView({ articleId: article._id });
    }
  }, [article?._id]);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Article article={{
          ...article,
          author: article.author ? { name: article.author.name } : { name: '' }
        }} />
        
        <Suspense fallback={<div>Loading comments...</div>}>
          <CommentSection articleId={article._id} />
        </Suspense>
        
        <Suspense fallback={<div>Loading related articles...</div>}>
          <RelatedArticles 
            currentArticleId={article._id}
            tags={article.tags}
          />
        </Suspense>
      </main>
    </div>
  );
}