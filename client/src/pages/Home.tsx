import useDocumentTitle from "../hooks/useDocumentTitle";
import useUser from "../hooks/useUser";
import PreLoader from "../components/PreLoader";
import Form from "../components/Form";
import LatestMessagesViewer from "../components/LatestMessagesViewer";

function Home(){
  useDocumentTitle("Home")
  const { name, rooms, user, isLoading } = useUser()

  if(isLoading) return <PreLoader />

  return ( 
  <>
    <div className="container">
      <div className="page-content">
        <div className="user">
          <div className="greeting">
            <h1>Welcome, {name}👋</h1>
          </div>
          <LatestMessagesViewer rooms={rooms.filter((room: any)=> room.messages[0] ? room : null)} />
        </div>
        <Form token={user.token} />
      </div>
    </div>
  </>
  )
}

export default Home;
