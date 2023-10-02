'use client';

const NavBar = () => {
  // Need to access state of wallet connection

  // Make it so when user connects to wallet the button changes to disconnect
  // and a profile image pops up which user can click on to change username
  // this should really be stored in a database not on chain, doesn't make sense to charge users to change name

  return (
    <div className='flex justify-between px-10 py-6'>
      <h1 className='text-4xl italic'>TrackChain</h1>
      {/* <button
        className='border px-8 py-2 rounded-lg hover:shadow-md'
        onClick={async () => {
          if (signer) {
            console.log('disconnect wallet');
            await disconnect();
          } else {
            console.log('connect wallet');
            // await connectToMetamask();
          }
        }}>
        {signer ? 'Disconnect' : 'Connect Wallet'}
      </button> */}
    </div>
  );
};
export default NavBar;
