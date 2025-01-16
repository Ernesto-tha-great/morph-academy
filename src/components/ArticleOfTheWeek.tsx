/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Image from 'next/image'
import { ArrowRight } from "lucide-react"
import Link from 'next/link'
import { Button } from './ui/button'
import { api } from '../../convex/_generated/api'
import { useQuery } from 'convex/react'
import { motion } from 'framer-motion'
import { useMemo } from 'react'

export default function ArticleOfTheWeek() {
  const articles = useQuery(api.articles.list, {
    limit: 50,
  });
  
  const featuredArticle = useMemo(() => {
    if (!articles) return null;
    return articles.find(article => 
      article.category !== "guide" && 
      article.category !== "morph" && 
      article.status === "published"
    );
  }, [articles]);

  if (!featuredArticle) return null;

  const encodedSlug = encodeURIComponent(featuredArticle.slug)
    .toLowerCase()
    .replace(/%20/g, '-')
    .replace(/[&]/g, 'and')
    .replace(/[^a-z0-9-]/g, '');

  return (
    <>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-emerald-900 mb-8 font-manrope"
      >
        Article of the Week
      </motion.h2>
      
      <Link href={`/blog/${encodedSlug}`} className="block group">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-3xl transform -rotate-1 scale-[1.02] opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          <div className="relative bg-white rounded-3xl border border-emerald-100/50 overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-500">
            <div className="flex flex-col lg:flex-row gap-12 p-12">
              <div className="relative w-full lg:w-[600px] aspect-[16/10] rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent z-10" />
                <Image 
                  src={featuredArticle.headerImage || '/guy.svg'} 
                  alt="Featured article" 
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-700" 
                />
              </div>

              <div className="flex flex-col flex-1 justify-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium">
                    Featured
                  </div>
                  <h3 className="text-4xl font-bold text-emerald-900 group-hover:text-emerald-700 transition-colors duration-300">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-lg text-emerald-700/80 leading-relaxed">
                    {featuredArticle.excerpt || featuredArticle.content.slice(0, 150)}...
                  </p>
                  <div className="flex items-center gap-2 text-emerald-600 group-hover:text-emerald-500 transition-colors">
                    <span>Read article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </>
  );
}