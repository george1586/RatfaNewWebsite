import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import Footer from '../components/Footer';
import { useSeo } from '../lib/useSeo';

const CATEGORY_COLORS = {
    'Guides': 'bg-[#1A1A1A] text-white',
    'Parenting': 'bg-[var(--primary)] text-white',
    'Privacy': 'bg-[#1A1A1A] text-white',
    'Digital Wellness': 'bg-[var(--bg-alt)] text-[var(--ink)]',
};

export default function BlogPage() {
    useSeo({
        title: 'Blog — Steelgate',
        description: 'Guides on blocking social media, enforcing screen time, network-level ad blocking, and taking back your household\'s attention.',
        canonical: 'https://steelgate.io/blog',
    });

    return (
        <div className="bg-[var(--bg)] min-h-screen">

            {/* ── Header ── */}
            <section className="pt-[calc(var(--header-h)+80px)] pb-16 px-6">
                <div className="max-w-[var(--content-w)] mx-auto">
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-6">
                        Blog
                    </p>
                    <h1
                        className="text-[clamp(2.6rem,6vw,4.5rem)] font-display leading-[1.05] tracking-tight text-[var(--ink)]"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Guides & thinking.
                    </h1>
                </div>
            </section>

            {/* ── Post grid ── */}
            <section className="px-6 pb-24">
                <div className="max-w-[var(--content-w)] mx-auto">
                    <div className="grid md:grid-cols-2 gap-6">
                        {blogPosts.map((post, i) => (
                            <Link
                                key={post.slug}
                                to={`/blog/${post.slug}`}
                                className={`group flex flex-col rounded-2xl border border-[var(--border)] overflow-hidden hover:border-[var(--ink)] transition-colors duration-200 ${i === 0 ? 'md:col-span-2' : ''}`}
                                style={{ background: 'var(--bg-alt)' }}
                            >
                                <div className={`p-8 flex flex-col gap-4 ${i === 0 ? 'md:flex-row md:gap-12 md:items-end' : ''}`}>
                                    <div className={i === 0 ? 'md:flex-1' : ''}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className={`text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category] ?? 'bg-[var(--bg)] text-[var(--ink)]'}`}>
                                                {post.category}
                                            </span>
                                            <span className="text-[12px] text-[var(--ink-muted)]">{post.readTime}</span>
                                        </div>
                                        <h2 className={`font-bold text-[var(--ink)] leading-[1.2] tracking-tight group-hover:opacity-70 transition-opacity duration-150 ${i === 0 ? 'text-[clamp(1.4rem,3vw,2rem)]' : 'text-[1.15rem]'}`}>
                                            {post.title}
                                        </h2>
                                    </div>
                                    <div className={i === 0 ? 'md:max-w-[360px]' : ''}>
                                        <p className="text-[15px] text-[var(--ink-muted)] leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                        <p className="mt-4 text-[13px] font-semibold text-[var(--ink)] flex items-center gap-1.5 group-hover:gap-3 transition-all duration-150">
                                            Read article <span>→</span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
