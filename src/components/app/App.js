
import Header from '../header/Header'
import SearchPanel from '../search/Search';
import Filter from '../filter/Filter';
import JobList from '../jobList/JobList';
import './app.css';

function App() {
  return (
    <>
    <div className='content-wrap'>
      <Header/>
      <div className='main'>
        <div className='container'>
            <div className='filter-wrap'>
              <Filter/>
            </div>
            <div className='frame'>
              <SearchPanel/>
              <JobList/>
              
            </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default App;




/*  fetchSuperJobData()
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  }); 
 */
  //вывод профессии и айдишника data=>data.objects.forEach(item => console.log(item.profession, item.id));
