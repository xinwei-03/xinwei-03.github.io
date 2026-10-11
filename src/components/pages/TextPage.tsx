'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { TextPageConfig } from '@/types/page';

interface TextPageProps {
    config: TextPageConfig;
    content: string;
    embedded?: boolean;
}

export default function TextPage({ config, content, embedded = false }: TextPageProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={embedded ? "" : "max-w-3xl mx-auto"}
        >
            <h1 className={`${embedded ? "text-2xl" : "text-4xl"} font-serif font-bold text-primary mb-4`}>{config.title}</h1>
            {config.description && (
                <p className={`${embedded ? "text-base" : "text-lg"} text-neutral-600 dark:text-neutral-500 mb-8 max-w-2xl`}>
                    {config.description}
                </p>
            )}
            <div className="text-neutral-700 dark:text-neutral-600 leading-relaxed">
                <ReactMarkdown
                    components={{
                        img: ({ src, alt }) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={src}
                                alt={alt || ""}
                                loading="lazy"
                                style={{
                                    display: "block",
                                    height: "220px",
                                    width: "auto",
                                    maxWidth: "none",
                                    flexShrink: 0,
                                    objectFit: "contain",
                                    margin: 0,
                                    borderRadius: "12px",
                                }}
                            />
                        ),
                        h1: ({ children }) => <h1 className="text-3xl font-serif font-bold text-primary mt-8 mb-4">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-2xl font-serif font-bold text-primary mt-8 mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-2">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-xl font-semibold text-primary mt-6 mb-3">{children}</h3>,
                                                p: ({ node, children }) => {
                            const isPhotoRow =
                                node?.children.some(
                                    (child) =>
                                        child.type === "element" &&
                                        child.tagName === "img"
                                ) &&
                                node?.children.every(
                                    (child) =>
                                        (child.type === "element" &&
                                            child.tagName === "img") ||
                                        (child.type === "text" &&
                                            child.value.trim() === "")
                                );

                            if (isPhotoRow) {
                                return (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "nowrap",
                                            gap: "12px",
                                            overflowX: "auto",
                                            alignItems: "center",
                                            margin: "16px 0 32px",
                                            paddingBottom: "12px",
                                        }}
                                    >
                                        {children}
                                    </div>
                                );
                            }

                            return (
                                <p className="mb-4 last:mb-0">
                                    {children}
                                </p>
                            );
                        },
                        ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 ml-4">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 ml-4">{children}</ol>,
                        li: ({ children }) => <li className="mb-1">{children}</li>,
                        a: ({ ...props }) => (
                            <a
                                {...props}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
                            />
                        ),
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-accent/50 pl-4 italic my-4 text-neutral-600 dark:text-neutral-500">
                                {children}
                            </blockquote>
                        ),
                        strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
                        em: ({ children }) => <em className="italic text-neutral-600 dark:text-neutral-500">{children}</em>,
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </motion.div>
    );
}
