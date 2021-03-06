import { NEW_SALARY_POSTING } from './types';
import { GET_SALARY } from './types';
import backendServer from '../../webConfig';
import axios from 'axios';

export const insertNewSalaryDetails = (salaryData) => (dispatch) => {
  axios
    .post(`${backendServer}/glassdoor/company/salary/`, salaryData)
    .then((response) =>
      dispatch({
        type: NEW_SALARY_POSTING,
        payload: response.data,
      }),
    )
    .catch((error) => {
      console.log(error);
    });
};

