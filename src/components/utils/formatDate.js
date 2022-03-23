export const formatDate = (date) => {
    try {
        const newdate = new Date(date);
        const day = newdate.getDate();
        const month = newdate.getMonth() + 1;
        const year = newdate.getFullYear();
        
        return `${day}.${month}.${year}`;
    } catch (e) {
        return '';
    }
};