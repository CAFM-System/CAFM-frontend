import { Building2 } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
      
      {/* bg image */}
      <div className="absolute inset-0 bg-cover bg-center"
        style={{backgroundImage: "url('/images/loginPageImages/login_bg.jpeg')"}}
        //https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjM0MjAwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral
      >
        {/* Semi-transparent gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-900/80 via-indigo-900/70 to-purple-900/80"></div>
      </div>
      
      {/* content container */}   
      <div className="relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
       
        {/* left section - logo and text */}
        <div className="text-white space-y-6 px-4 hidden md:block">
          
          <div className="flex items-center gap-2 text-sm tracking-widest">
                <Building2 className="w-5 h-5" />
                <span>FACILITIES</span>
          </div>

           <div className="space-y-4">
                <div className="text-6xl tracking-tight leading-tight">MANAGE
                <div className="text-7xl">SMARTER</div>
            </div>
            
            <p className="text-xl text-blue-100 max-w-md">
             Where Your Facilities Management Becomes Effortless.
            </p>
            
            <p className="text-base text-blue-200 max-w-lg leading-relaxed">
              Streamline maintenance requests, track complaints, and enhance communication between residents, technicians, and administrators—all in one powerful platform.
            </p>
        </div>
        </div>


        {/* right section - login form */}
        <div>

        </div>
            
        </div>
    </div>
  )
}