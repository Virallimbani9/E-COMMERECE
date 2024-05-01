export const registerController = ()=>{
    try{


    }catch(e){
        console.log(e);
        res.status(404).send({
            success: false,
            message: "Error In Register",
            error: e,
        })
        process.exit(1);
    }
};

