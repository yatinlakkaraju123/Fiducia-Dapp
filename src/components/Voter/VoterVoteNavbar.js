function VoterVoteNavbar()
{
    return (
        <>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
    
      <a class="navbar-brand" to="/ChairHome/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
  </svg></a>
      
      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav ">
          <li class="nav-item">
          <button  type='button' style={{marginRight:"0px",}} className='btn btn-info ml-auto mr-1' onClick={loadWeb3}>Connect</button>
          </li>
         
          
          
        </ul>
       
        
      </div>
    </div>
  </nav>
        </>
    );
}

export default VoterVoteNavbar;