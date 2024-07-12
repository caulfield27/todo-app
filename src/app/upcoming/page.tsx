import PagesContainer from "@/layouts/pagesContainer/pagesContainer"
import Wrapper from "@/layouts/wrappepr/wrapper";
import BrowserPrivateRoute from "@/routes/BrowserPrivateRoute";
const Upcoming = () => {
    return (
        <BrowserPrivateRoute>
            <PagesContainer>
                <Wrapper>
                    <h1>Upcoming</h1>
                </Wrapper>
            </PagesContainer>
        </BrowserPrivateRoute>
    );
}

export default Upcoming;