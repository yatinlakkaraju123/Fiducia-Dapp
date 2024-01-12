function ChairFeedbackNavbar()
{
    return (
        <>
             <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    
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

export default ChairFeedbackNavbar;