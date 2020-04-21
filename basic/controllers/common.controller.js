import { commonService } from '../services/common.service'

const commonController = {
    sendMail: (req, res, next) => {
        const contactDTO = req.body;
        commonService.sendMail(contactDTO);
    }    
}

export default commonController;