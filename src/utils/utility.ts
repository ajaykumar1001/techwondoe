import * as bcrypt from 'bcrypt';
import { Constants } from './constants';

const encryptPassword = (plainText) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainText, salt);
};

const comparePassword = (plainText, encrypedPassword) => {
  return bcrypt.compareSync(plainText, encrypedPassword);
};

const customErrorResponse = (statusCode) => {
  let errorMsg = '';
  switch (statusCode) {
    case 11000:
      errorMsg = Constants.ERROR.DUPLICATE_KEY;
      break;
    case 11001:
      errorMsg = Constants.ERROR.DUPLICATE_KEY_UPDATE;
      break;
    default:
      errorMsg = Constants.ERROR.ERROR_OCCURRED;
      break;
  }
  return errorMsg;
};

const teamCategorized = (teams) => {
  const res = {};
  teams.forEach((team) => {
    if (!res[team.cId.uuid]) {
      res[team.cId.uuid] = {
        companyId: team.cId.uuid,
        companyName: team.cId.name,
        teams: [
          {
            teamId: team.uuid,
            tlName: team.tlName,
          },
        ],
      };
    } else {
      res[team.cId.uuid].teams.push({
        teamId: team.uuid,
        tlName: team.tlName,
      });
    }
  });
  return res;
};

export {
  encryptPassword,
  comparePassword,
  customErrorResponse,
  teamCategorized,
};
