import AppError from "./AppError.js";

export function pagination (pages , limit){
    pages = parseInt(pages);
    limit = parseInt(limit);
    if(Number.isNaN(pages)||Number.isNaN(limit))
        throw new AppError("Invalid page number or limit number",400);
    if(pages<=0)
        throw new AppError("Invalid page number",400);
    if(limit>=50)
        throw new AppError("Invalid limit number: limit must be less than 50",400);
    if(limit<=0)
        throw new AppError("Invalid limit number : limit must be greater than 0",400);
    const offset = (pages-1)*limit;
    return {offset , limit};
}


export function calcualteTotalPages(totalItems,limit){
    limit = parseInt(limit);
    if(Number.isNaN(limit))
        throw new AppError("Invalid limit number",400);
    if(limit<=0)
        throw new AppError("Invalid limit number : limit must be greater than 0",400);
    if(limit>=50)
        throw new AppError("Invalid limit number: limit must be less than 50",400);
    return Math.ceil(totalItems/limit);
} 