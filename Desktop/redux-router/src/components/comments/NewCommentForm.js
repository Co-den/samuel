import { useRef, useEffect } from 'react';
//import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { addComments } from '../../lib/api';
import classes from './NewCommentForm.module.css';
import LoadingSpinner from '../ui/LoadingSpinner';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();


  const { sendRequest, status, error } = useHttp(addComments);

  const { onAddedComments } = props;
  
  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddedComments();
    }
  }, [status, error, onAddedComments])


  const submitFormHandler = (event) => {
    event.preventDefault();


    const enteredText = commentTextRef;
    // optional: Could validate here

    // send comment to server
    sendRequest({ commentData: { text: enteredText}, quoteId: props.quoteId});
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' && (
        <div className='centered'>
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
