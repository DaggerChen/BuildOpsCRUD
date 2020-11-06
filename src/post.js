import React from 'react';
// import DeletePost from './deletePost';
// import EditPost from './editPost';

class Post extends React.Component {

    // componentDidMount() {
    //     this.props.subscribeToMore();
    // }


    render() {
        const items = this.props.data.listEmployees.items;
        return items.map((employee) => {
            return ( 
                <div key={employee.id}>
                    <p>{employee.id}</p>
                    <p>{employee.firstname}</p>
                    <p>{employee.lastname}</p>
                    <time dateTime={employee.createdAt}>
                    {new Date(employee.createdAt).toDateString()}</time>
                    <br />
                    {/* <EditPost {...post}/>
                    <DeletePost {...post} /> */}
                </div>

            )
        })


    }

}


export default Post;