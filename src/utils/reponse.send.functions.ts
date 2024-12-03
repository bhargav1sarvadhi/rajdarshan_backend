import { encrypt } from '../helpers';
import { RES_STATUS, RES_TYPES } from '../constant';
import { logger } from '../logger/logger';

const responseMappings = {
    [RES_STATUS.CREATE]: {
        statusCode: 201,
        defaultMessage: RES_TYPES.CREATE,
    },
    [RES_STATUS.GET]: {
        statusCode: 200,
        defaultMessage: RES_TYPES.FETCH,
    },
    [RES_STATUS.DELETE]: {
        statusCode: 200,
        defaultMessage: RES_TYPES.DELETE,
    },
    [RES_STATUS.UPDATE]: {
        statusCode: 200,
        defaultMessage: RES_TYPES.UPDATE,
    },
    default: { statusCode: 200, defaultMessage: 'Success' },
};

const sendResponse = (res, req, response) => {
    const mapping =
        responseMappings[response.responseType] || responseMappings.default;
    const { statusCode, defaultMessage } = mapping;
    const message = response.message || defaultMessage;
    logger.info(
        `${statusCode} - ${req?.originalUrl} - ${req?.method} - ${req?.ip}`,
    );
    // const isLocalhost = res.locals.isLocalhost || false;
    if (response.responseType === RES_STATUS.GET) {
        return res.status(statusCode).json({
            success: true,
            statusCode: statusCode,
            data: response.data,
            // dsc_data: response.data,
            message: message,
            pagination: {
                total: response.total || 0,
                pageIndex:
                    Math.floor(
                        response?.paginations?.offset /
                            response?.paginations?.limit,
                    ) + 1 || null,
                pageSize: response?.paginations?.limit || null,
            },
        });
    } else {
        return res.status(statusCode).json({
            success: true,
            statusCode: statusCode,
            // dsc_data: response.data,
            data: response.data, // temporary
            message: message,
        });
    }
};

export { sendResponse };
