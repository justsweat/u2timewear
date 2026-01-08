export default function AboutPage() {
    return (
        <div className="container py-3xl">
            <h1 className="mb-lg">About U2timewear</h1>
            <div className="card py-xl" style={{ padding: 'var(--space-2xl)' }}>
                <p className="heroText">
                    U2timewear is a brand born from the desire to celebrate individuality.
                    In a world of mass-produced looks, we believe your watch should be as
                    unique as your journey.
                </p>
                <p>
                    Founded in Malaysia, we curate watches that combine modern design
                    with expressive colors and reliable quality. Our mission is to provide
                    affordable timepieces that don't just tell time, but tell
                    <strong> your </strong> story.
                </p>
                <div className="mt-xl">
                    <h3 className="mb-sm">Our Philosophy</h3>
                    <p>
                        <strong>Uniquely You.</strong> We don't follow trends blindly.
                        We create options that allow you to find the perfect match for your
                        personality, whether that's bold and vibrant or quiet and confident.
                    </p>
                </div>
            </div>
        </div>
    );
}
