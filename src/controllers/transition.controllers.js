import accountModel from "../model/account.model.js";


/**
 * create new transitons
 * 10 steps
 * 1. Validate request body
 * 2. validate idempotency key
 * 3. check accout status
 * 4. derive sender balance from ledger
 * 5 create transition (pending)
 * 6. create debit ledger entry
 * 7. create credit ledger entry
 * 8. mark transition completed
 * 9. commit mongodb session
 * 10. send email notification 
 */

async function createTransition(req,res) {
    /**
     * 1. Validate request body
     */
    const{fromAccount, toAccount, amount, idempotencyKey} = req.body;
    
    if(!fromAccount || !toAccount || !amount || !idempotencyKey){
      return  res.status(400).json({message:"Missing required fields: fromAccount, toAccount, amount, idempotencyKey"})
    }

    const fromUserAccount = await accountModel.findOne({
        _id: fromAccount
    })

    const toUserAccount = await accountModel.findOne({
        _id: toAccount
    })

    if(!fromUserAccount || !toUserAccount){
        return res.status(404).json({message:"Invalid fromAccount or toAccount"})
    }

    /**
     * 2. validate idempotency key
     */

    const isTransitionAlreadyExists = await transitionModel.findOne({
        idempotencyKey : idempotencyKey
    })

    if(isTransitionAlreadyExists){
        if(isTransitionAlreadyExists.status === "COMPLETED"){
            return res.status(200).json({message:"Transition already processed", transition: isTransitionAlreadyExists})
        }
        if(isTransitionAlreadyExists.status === "PENDING"){
            return res.status(200).json({message:"Transition is pending, please wait"})
        }
        if(isTransitionAlreadyExists.status === "FAILED"){
            return res.status(200).json({message:"Previous transition attempt failed, please retry"})
        }
        if(isTransitionAlreadyExists.status === "REVERSED"){
           return res.status(200).json({message:"Previous transition was reversed, please retry"}) 
        }
    }

    /**
     * 3. check accout status
     */

    if(fromUserAccount.status !== "ACTIVE" ||  toUserAccount.status !== "ACTIVE"){
       return res.status(400).json({message:"Both fromAccount and toAccount must be active"}) 
    }

    /**
     * 4. derive sender balance from ledger
     */

    


}