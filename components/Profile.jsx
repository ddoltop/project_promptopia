import PromptCard from "./PromptCard"


const Profile = ({name, desc, data, handleEdit, handleDelete}) => {
  // console.log('Profile>>>>',data);
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="text-left mt-5">
        {desc}
      </p>
      <div className='mt-16 prompt_layout'>
        {data.map((post, index) => (
          <PromptCard
            key={post._id + index}
            post={post}
            handleEdit={()=> handleEdit && handleEdit(post)}
            handleDelete={()=> handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile