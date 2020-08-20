const getUniqueErrorMessage = (err) => {
    let custom_message;
    try {

       

        let field_name = "";
        let field_name_end = err.message.lastIndexOf('_1') - 1;
        for (let i = field_name_end; i >= 0; i--) {
            if (err.message[i] !== ' ') {
                field_name = err.message[i] + field_name;
            }
            else {
                break;
            }
        }

        custom_message = field_name.charAt(0).toUpperCase() + field_name.slice(1) + ' already exists!';
    }
    catch(ex) {
        custom_message = "Unique field already exists!"
    }

    return custom_message;
}

const getErrorMessage = (err) => {
    let message = '';

    if (err.code) {
        switch(err.code) {
            case 11000:
            case 11001:


                message = getUniqueErrorMessage(err)

                break
            default:
                message = 'Something went wrong!'
        }
    }
    else {
        for (let errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message
            }
        }
    }
    return message;
};

export default {getErrorMessage};
