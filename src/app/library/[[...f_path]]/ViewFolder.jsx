import { Table,Box,Container, Typography } from '@mui/joy';

import SendIcon from '@mui/icons-material/Send';
import FolderIcon from '@mui/icons-material/FolderOutlined';
import Link from 'next/link'
import PageHeader from '@/components/PageHeader';

function generateBreadcrumbs({params}){
  let breadcrumbs = []
  let b = {
    text: "Library",
  }
  if(params.f_path?.length){
    let slug='/library';
    b.href='/library';
    breadcrumbs.push(b) ;
    params.f_path.forEach(function(name,i){
      let b={
        text:name
      }
      if(i!=params.f_path.length-1){
        slug+='/'+name;
        b.href=slug;
      }
      breadcrumbs.push(b);
    })
  }
  else{
    breadcrumbs.push(b) ;
  }
  return breadcrumbs;
}

export default function ViewFolder({params,folder,contents,fileList}){
  // params.f_path will be an array containing all segments after /library/
  // e.g. for /library/level1/level2/level3
  // params.f_path = ['level1', 'level2', 'level3']
  const breadcrumbs = generateBreadcrumbs({params});
  

  const dir = params.f_path?'/'+params.f_path?.join('/'):'';
  return <>
    <Container>
      <br/>
      <PageHeader breadcrumbs={breadcrumbs} header={{
        part1: 'Folder:',
        part2: folder.name
      }}/>
      <Typography level='body-sm'>{folder.description}</Typography>
     
      <Table sx={{
        pt:1,
        "--Table-headerUnderlineThickness": "2px",
        "--TableCell-height": "25px"
      }}>
        <thead>
          <tr >
            <th>Name</th>
            <th>Description</th>
            <th>Tasks</th>
          </tr>
        </thead>
        <tbody>
          {contents.map((content)=>{
            return <>
              <tr>
                <td>
                  {content.type=='folder' && <>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FolderIcon  />
                      <Link href={'/library'+dir+'/'+content.slug}>{content.name}</Link>
                    </Box>
                  </>}
                  {content.type=='task' && <>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SendIcon sx={{color: '#6435c9'}} />
                      <Link href={'/task/'+content.slug}>{content.name}</Link>
                    </Box>
                  </>}
                </td>
                <td>{content.description}</td>
                <td></td>
              </tr>
            </>
          })}
          
          
        </tbody>
      </Table>

      {/* <pre>{JSON.stringify(folder,null,2)}</pre> */}
      {/* <pre>{JSON.stringify(contents,null,2)}</pre> */}
    </Container>
  </>
}