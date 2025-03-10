import _ from "lodash"
import { switchMap, tap } from "rxjs"
import { Layout } from "~/lib/0_Layout.dual.tsx"
import { asyncPrerenderStatic } from "~/lib/00_ReactAsyncPrerender.dual.tsx"
import { deferFrom } from "~/lib/fs_watcher.deno.ts"
import { Render$ } from "../../lib/0_RenderBase.deno.tsx"

const OUTFILE = import.meta.filename!.replace(
  ".render.deno.tsx",
  ".vite.html",
)

export const render$ = deferFrom(async () => {
  const $ = Render$()

  const main = [
    $.H2(
      "Buy a domain",
      <p>
        I used <a href="https://porkbun.com/">Porkbun</a>,
        very easy to use. They also come with easy to use
        WHOIS protection, which is a big plus.
      </p>,
    ),
    $.H2(
      "Buy a pre-pay VPS",
      <p>
        I do not want to put a line of credit on big cloud
        names and I am not wizard enough to magic myself my
        own vps on my own hardware (...yet) with a stable
        IP. But we'll get there.
        <br />I got the lowest cost compute instance over at{" "}
        <a href="https://www.vultr.com/">Vultr</a> for about
        $5/month. Once you go through this and get an
        instance, you must ssh into it with vultr's docs.
      </p>,
    ),
    $.H2(
      "Find your IP4 address",
      <>
        <p>
          Once your instance is created, it will have an ip4
          address ready to go. You will want to copy this
          and head back to porkbun.
        </p>
        <img
          src="./server_info.png"
          alt="vultr screenshot of instance portal where you can find ip address"
        />
      </>,
    ),
    $.H2(
      "Update Porkbun DNS",
      `
        Once in [Porkbun Portal](https://porkbun.com/account/domainsSpeedy),
        look for your domain name, and click on its
        ''Details''. What expands below is a lot of config
        options. Find the ever so tiny button next to the
        words ''DNS Records''.

        ![screenshot of porkbun portal and where to click](./porkbun.png)
      `,
    ),
    $.H3(
      "Ensure 2 A Records",
      `
        Take your IP from vultr and make sure there are 2 A records, both pointing to the ip address. 
        1. Have one for your domain
        2. And have another for ''www.<your-domain>''
        3. Both answer sections should be your vultr ip4 address
        `,
    ),
    $.H2(
      "SSH Time",
      `
      Now we need to get on the box, so take your IP address and follow the ssh instructions from vultr to get in.
      You can either wait for your DNS records to propogate (will likely take 10 minutes or so), or directly use the ip address. 

      Please [follow these instructions at Vultr](https://docs.vultr.com/how-to-use-ssh-with-vultr-servers)

      I have made an alis in my \`~/.bash_profile\`

      \`\`\`bash title=~/.bash_profile
      ssh-blog() { ssh "root@$YOUR_DOMAIN_NAME"; }
      \`\`\`
      `,
    ),
    $.H2(
      "Install nginx and ssl",
      `
        There are lots of ways to do this part, but I went a simple route
        1. SSH onto the machine
        2. [Follow install instructions for nginx and validate it works with regular http](https://docs.vultr.com/how-to-install-and-configure-nginx-on-a-vultr-cloud-server)
            1. Do a quick check and go to &nbsp; \`http://your-domain\`
        3. Using [Certbot but with better docs for ubuntu and apt](https://www.inmotionhosting.com/support/website/ssl/lets-encrypt-ssl-ubuntu-with-certbot/)

        \`\`\`bash title="ssh:vultr"
        sudo apt install certbot python3-certbot-nginx -y
        sudo certbot --nginx -d $YOUR_DOMAIN_NAME -d www.$YOUR_DOMAIN_NAME

        service restart nginx
        \`\`\`
        4. Now try going back to your site, but this time use \`https://\`
      `,
    ),
    $.H2(
      "Deploying your site",
      `
      I just opted to build my blog using multiple trials of tech, writing my own, and now astro. I needed VPS because I am going to write demo apps for people to log into and expose as portfolio and honestly any other idea I could have. Vultr has great instance setups, so I can skip docker if I need to, or use it to my advantage. 
      `,
    ),

    $.H3(
      "Just install rsync",
      `
      Somehow, someway, and always eventually, you must install rsync. Its really not that bad but install can take a second depending on your situation.

      This is totally dependent, but I have an ancient Intel MacBook Pro, so I had to use a painfully slow \`brew install rsync\`. During that install time, I was having second thoughts thanks to Apple not supporting their old hardware OS updates. Anyways, I can't really link anything for you here, I recommend surfing the web for your situation.
      `,
    ),
    $.H3(
      "Bash time",
      `
      \`\`\`bash title="the-great-deployer-but-actually-its-simple-af.bash"
      #!/usr/bin/env bash

      # christ the trailing slash is important for rsync
      export LE_BLOG=~/projects/le-blog/dist/ 
      export LE_BLOG_TARGET=/var/www/html

      _.blog.sync.watch() {
        fswatch -o $LE_BLOG | while read;
          do _.blog.sync
        done;
      }

      _.blog.sync() {
        rsync \
          --include dist/ \
          --exclude node_modules/ \
          --exclude .git/ \
          --progress \
          -avz \
          "$LE_BLOG" "root@hafley.codes:$LE_BLOG_TARGET"
      }
      \`\`\`
      `,
    ),
  ]
  ;`

`
  return asyncPrerenderStatic(
    <Layout
      title="How I started this site as of 2025/02/27"
      url="/blog/how-i-made-this-site"
      description="TOCs are hard man"
      author=""
      date_created="2025-02-25"
      tags={[
        "typescript",
        "astro",
        "vultr",
        "bash",
        "javascript",
        "sql",
        "css",
        "deployments",
      ]}
    ></Layout>,
  )
}).pipe(
  tap({}),
  switchMap(
    async content => (
      console.log("Writing...", OUTFILE),
      {
        writer: await Deno.writeTextFile(
          OUTFILE,
          content.replace(
            /[\u0000-\u001F\u007F-\u009F]/g,
            "",
          ),
        ),
        content,
        renderedPath: OUTFILE,
        dirname: import.meta.dirname,
        filename: import.meta.filename,
      }
    ),
  ),
)
