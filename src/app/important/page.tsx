import PagesContainer from "@/layouts/pagesContainer/pagesContainer";
import Wrapper from "@/layouts/wrappepr/wrapper";
import BrowserPrivateRoute from "@/routes/BrowserPrivateRoute";

const Important = () => {
    return (
        <BrowserPrivateRoute>
            <PagesContainer>
                <Wrapper>
                    <h1>Important</h1>
                </Wrapper>
            </PagesContainer>
        </BrowserPrivateRoute>
    );
}

export default Important;