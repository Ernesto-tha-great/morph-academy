'use client'

import React, { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { Suspense } from "react";
import { getBySlug } from "@/lib/articles";
import { useMutation } from "convex/react";
import { Article } from "../../../../components/Article";
import { CommentSection } from "../../../../components/CommentSection";
import { RelatedArticles } from "../../../../components/RelatedArticles";
import { api } from "../../../../../convex/_generated/api";
import ArticleLoadingSkeleton from "@/components/Skeleton";



export default function ArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const recordView = useMutation(api.articles.recordView);


  useEffect(() => {
    async function loadArticle() {
      if (!params.slug) return;
      
      try {
        const data = await getBySlug(params.slug as string);
        if (!data) {
          notFound();
        }
        setArticle(data);
        await recordView({ articleId: data._id });
      } catch (error) {
        console.error('Failed to load article:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadArticle();
  }, [params.slug]);

  if (isLoading) {
    return <ArticleLoadingSkeleton />;
  }

  if (!article) {
    return null;
  }

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