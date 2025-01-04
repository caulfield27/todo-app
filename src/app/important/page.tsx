"use client"
import PagesContainer from "@/layouts/pagesContainer/pagesContainer";
import Wrapper from "@/layouts/wrappepr/wrapper";

const Important = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    function handlePlay() {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
        setIsPlaying(prev => !prev)
    }
    console.log(loading);
    
    return (
       
            <PagesContainer>
                <Wrapper>
                    {loading ? <h1>Загрузка видео...</h1> : null}
                    <main className={styles.main}>
                        <article className={styles.article} onClick={handlePlay}>
                            <video
                               onWaiting={()=> setLoading(true)}
                                onPlaying={()=> setLoading(false)}
                                ref={videoRef}
                                className={styles.video} src="https://humo-cms.onrender.com/uploads/umed_96e716a64b.mp4" />
                        </article>
                    </main>
                </Wrapper>
            </PagesContainer>
       
    );
}

export default Important; 