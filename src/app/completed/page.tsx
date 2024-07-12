import PagesContainer from "@/layouts/pagesContainer/pagesContainer"
import Wrapper from "@/layouts/wrappepr/wrapper";
import BrowserPrivateRoute from "@/routes/BrowserPrivateRoute";

const Completed = () => {
    return (
        <BrowserPrivateRoute>
            <PagesContainer>
                <Wrapper>
                    <h1>Completed</h1>
                </Wrapper>
            </PagesContainer>
        </BrowserPrivateRoute>
    );
}

export default Completed;