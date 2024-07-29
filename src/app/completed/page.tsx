import PagesContainer from "@/layouts/pagesContainer/pagesContainer"
import Wrapper from "@/layouts/wrappepr/wrapper";
import BrowserPrivateRoute from "@/routes/BrowserPrivateRoute";



const Completed = () => {

    return (
        <BrowserPrivateRoute>
            <PagesContainer>
                <Wrapper>
                    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                        completed

                    </div>

                </Wrapper>
            </PagesContainer>
        </BrowserPrivateRoute>
    );
}

export default Completed;