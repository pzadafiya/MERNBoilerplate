import { all, fork } from 'redux-saga/effects';
import authenticationSaga from "./account/saga";

function* rootSaga() {
    yield all([
        fork(authenticationSaga)
        // ... add more saga here like 
        //fork(sagaName)
    ]);
}

export default rootSaga;