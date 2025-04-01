import { FS } from "~/SITEMAP.deno.ts"
import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
const $ = Render$(import.meta.filename!)

export default $.SSGLayout({
  title: "How I started this site as of 2025/02/27",
  description:
    "Old fashioned porkbun and vultr on the rocks",
  date_created: "2025-02-25",
  tags: ["astro", "vultr", "bash", "dns", "vps", "ssh"],
  ...$.md`
## Buy a domain
I used [Porkbun](https://porkbun.com/), very easy to use. They also come with easy to use WHOIS protection, which is a big plus.

## Buy a pre-pay VPS
I do not want to put a line of credit on big cloud names and I am not wizard enough to magic myself my own vps on my own hardware (...yet) with a stable IP. But we'll get there. 

I got the lowest cost compute instance over at [Vultr](https://www.vultr.com/) for about $5/month. 
Once you go through this and get an instance, you must ssh into it with vultr's docs. 

## Find your IP4 address
Once your instance is created, it will have an ip4 address ready to go. You will want to copy this and head back to porkbun. 

![vultr screenshot of instance portal where you can find ip address](./server_info.png)

## Update Porkbun DNS
Once in [Porkbun Portal](https://porkbun.com/account/domainsSpeedy), 
look for your domain name, and click on its \`Details\`. 
What expands below is a lot of config options. 
Find the ever so tiny button next to the words \`DNS Records\`.

![screenshot of porkbun portal and where to click](./porkbun.png)

### Ensure 2 A records
Take your IP from vultr and make sure there are 2 A records, both pointing to the ip address. 
1. Have one for your domain
2. And have another for \`www.<your-domain>\`
3. Both answer sections should be your vultr ip4 address

## SSH time
Now we need to get on the box, so take your IP address 
and follow the ssh instructions from vultr to get in.
You can either wait for your DNS records to propogate (will likely take 10 minutes or so), 
or directly use the ip address. 

Please [follow these instructions at Vultr](https://docs.vultr.com/how-to-use-ssh-with-vultr-servers)

I have made an alis in my \`~/.bash_profile\`

~~~bash title=~/.bash_profile
ssh-blog() { ssh "root@$YOUR_DOMAIN_NAME"; }
~~~

You'll know your done once you can ssh without putting in your password.

## Install nginx and ssl
There are lots of ways to do this part, but I went a simple route
1. SSH onto the machine
2. [Follow install instructions for nginx and validate it works with regular http](https://docs.vultr.com/how-to-install-and-configure-nginx-on-a-vultr-cloud-server)
    1. Do a quick check and go to &nbsp;\`http://your-domain\`
3. Using [Certbot but with better docs for ubuntu and apt](https://www.inmotionhosting.com/support/website/ssl/lets-encrypt-ssl-ubuntu-with-certbot/)

~~~bash title="ssh:vultr"
sudo apt install certbot python3-certbot-nginx -y

sudo certbot --nginx -d $YOUR_DOMAIN_NAME -d www.$YOUR_DOMAIN_NAME

service restart nginx
~~~

4. Now try going back to your site, but this time use \`https://\`

## Deploying your site
I just opted to build my blog using multiple trials of tech, writing my own, and now astro. 
I needed VPS because I am going to write demo apps for 
people to log into and expose as portfolio and honestly any other idea I could have. 
Vultr has great instance setups, so I can skip docker if I need to, or use it to my advantage. 

### Just install rsync
Somehow, someway, and always eventually, you must install rsync. Its really not that bad but install can take a second depending on your situation.

This is totally dependent, but I have an ancient Intel MacBook Pro, so I had to use a painfully slow \`brew install rsync\`. \
During that install time, I was having second thoughts thanks to Apple not supporting their old hardware OS updates. \
Anyways, I can't really link anything for you here, I recommend surfing the web for your situation.

### Bash time
Now you can add this script to your \`~/.bash_profile\`, and when you are ready to deploy your app, you can just sync with rsync and you are good to go.

~~~bash 
${FS["src/bash/rsync-it.bash"].readSync()}
~~~

Is it dangerous? Hmmmmmmaybe. 

Does it work? Oh yea. 

Am I scared of destroying my site? No, yay git. 

Do I need to run this code in 2 universes? MMMMMNot yet.

Good luck!

`,
})
