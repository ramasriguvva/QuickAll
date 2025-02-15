import Message from '../model/Message.js';
import Conversation from '../model/Conversation.js';

export const newMessage = async (request, response) =>{
    try{
        const newMessage = new Message(request.body);
        await newMessage.save();
        await Conversation.findByIdAndUpdate(request.body.conversationId, { message : request.body.text} );
        return response.status(200).json('Message has been sent successfully');

    }catch(error){
        return response.status(500).json(error.message);
    }
}


export const getMessages = async (request, response)  => {
    try{
        const messages = await Message.find({conversationId : request.params.id});
        return response.status(200).json(messages);
    }catch(error){
        return response.status(500).json(error.message);
    }
} 

/*export const deleteMessages = async (request, response)  => {
    try{
        const messages = await Message.find({conversationId : request.params.id});
        await messages.(messages._id);
        return response.status(200).json(messages);
    }catch(error){
        return response.status(500).json(error.message);
    }
}*/ 

export const deleteMessage =  (req, res) => {
    const id = req.params.id;
  
    Message.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };