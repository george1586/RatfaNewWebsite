import { useParams, Link, Navigate } from 'react-router-dom';
import { getPostBySlug, blogPosts } from '../data/blogPosts';
import Footer from '../components/Footer';
import { useSeo } from '../lib/useSeo';

function ContentBlock({ block }) {
    switch (block.type) {
        case 'h2':
            return <h2 className="text-[1.5rem] font-bold text-[var(--ink)] tracking-tight mt-10 mb-4">{block.text}</h2>;
        case 'h3':
            return <h3 className="text-[1.15rem] font-semibold text-[var(--ink)] tracking-tight mt-8 mb-3">{block.text}</h3>;
        case 'p':
            return <p className="text-[17px] text-[var(--ink)] leading-[1.75]">{block.text}</p>;
        case 'ul':
            return (
                <ul className="space-y-2 pl-1">
                    {block.items.map((item, i) => (
                        <li key={i} className="flex gap-3 text-[16px] text-[var(--ink)] leading-[1.7]">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--ink)] shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            );
        case 'ol':
            return (
                <ol className="space-y-3 pl-1">
                    {block.items.map((item, i) => (
                        <li key={i} className="flex gap-4 text-[16px] text-[var(--ink)] leading-[1.7]">
                            <span className="font-bold tabular-nums text-[var(--ink-muted)] shrink-0 w-5">{i + 1}.</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ol>
            );
        case 'callout':
            return (
                <div className="my-2 px-6 py-5 rounded-xl border-l-4 border-[var(--ink)]" style={{ background: 'var(--bg-alt)' }}>
                    <p className="text-[16px] font-medium text-[var(--ink)] leading-[1.7] italic">{block.text}</p>
                </div>
            );
        default:
            return null;
    }
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPostPage() {
    const { slug } = useParams();
    const post = getPostBySlug(slug);

    useSeo({
        title: post ? `${post.metaTitle} — Steelgate` : 'Steelgate Blog',
        description: post?.metaDescription,
        canonical: post ? `https://steelgate.io/blog/${post.slug}` : undefined,
    });

    if (!post) return <Navigate to="/blog" replace />;

    const otherPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 2);

    return (
        <div className="bg-[var(--bg)] min-h-screen">

            {/* ── Back nav ── */}
            <div className="pt-[calc(var(--header-h)+32px)] px-6">
                <div className="max-w-[var(--prose-w)] mx-auto">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors duration-150">
                        ← Blog
                    </Link>
                </div>
            </div>

            {/* ── Article header ── */}
            <header className="px-6 pt-10 pb-12">
                <div className="max-w-[var(--prose-w)] mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full bg-[#1A1A1A] text-white">
                            {post.category}
                        </span>
                        <span className="text-[13px] text-[var(--ink-muted)]">{post.readTime}</span>
                        <span className="text-[var(--ink-muted)]">·</span>
                        <span className="text-[13px] text-[var(--ink-muted)]">{formatDate(post.date)}</span>
                    </div>
                    <h1 className="text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-[var(--ink)] leading-[1.15] tracking-tight">
                        {post.title}
                    </h1>
                </div>
            </header>

            {/* ── Article body ── */}
            <article className="px-6 pb-20">
                <div className="max-w-[var(--prose-w)] mx-auto space-y-5">
                    {post.content.map((block, i) => (
                        <ContentBlock key={i} block={block} />
                    ))}
                </div>
            </article>

            {/* ── CTA ── */}
            <section className="px-6 mb-20">
                <div className="max-w-[var(--prose-w)] mx-auto">
                    <div className="rounded-2xl p-8 md:p-12" style={{ background: 'var(--ink)' }}>
                        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 mb-3">Steelgate</p>
                        <h2 className="text-[1.6rem] font-bold text-white leading-[1.2] tracking-tight mb-4">
                            One device. Every screen in your home.
                        </h2>
                        <p className="text-[16px] text-white/60 leading-relaxed mb-7">
                            Block distracting apps, filter ads and trackers, and set schedules — across every device automatically.
                        </p>
                        <a
                            href="/products"
                            className="inline-flex items-center px-6 py-3 rounded-full bg-white text-[var(--ink)] text-[14px] font-semibold hover:opacity-90 transition-opacity duration-150"
                        >
                            Pre-Order Steelgate
                        </a>
                    </div>
                </div>
            </section>

            {/* ── More posts ── */}
            {otherPosts.length > 0 && (
                <section className="px-6 mb-24">
                    <div className="max-w-[var(--prose-w)] mx-auto">
                        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-6">More reading</p>
                        <div className="space-y-4">
                            {otherPosts.map(p => (
                                <Link
                                    key={p.slug}
                                    to={`/blog/${p.slug}`}
                                    className="flex items-start justify-between gap-6 p-6 rounded-2xl border border-[var(--border)] hover:border-[var(--ink)] transition-colors duration-200 group"
                                    style={{ background: 'var(--bg-alt)' }}
                                >
                                    <div>
                                        <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[var(--ink-muted)] mb-2">{p.category}</p>
                                        <p className="text-[16px] font-semibold text-[var(--ink)] leading-snug group-hover:opacity-70 transition-opacity">{p.title}</p>
                                    </div>
                                    <span className="text-[var(--ink-muted)] shrink-0 mt-1 group-hover:translate-x-1 transition-transform duration-150">→</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
}
