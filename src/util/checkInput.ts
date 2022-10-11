import { HttpException, HttpStatus, Logger } from "@nestjs/common"

export function checkInput(object:{}, expectedKeys:string[]) {
    let count = 0
    for (const key in expectedKeys) {
        if (!(key in object)) count += 1 
    }

    // If all expected keys are not in the object this function throws a 417 error
    if (count > 0) {
        throw new HttpException({
            status: HttpStatus.EXPECTATION_FAILED,
            error: `Please include ALL required fields: ${expectedKeys.toString()}`
        }, HttpStatus.EXPECTATION_FAILED)
    }
}