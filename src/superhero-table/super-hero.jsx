import { useState, useEffect } from 'react'
import { RadarChart } from '../charts/radar-chart.jsx';
import pick from 'just-pick';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function SuperHero({ data, onClose}) {
  
  const [open, setOpen] = useState(data);
  useEffect(() => {
    setOpen(data);
  }, [data])
  console.log(data);

  const handleOpenChange = (e) => {
    setOpen(e);
    onClose(e);
  }
  /*
  name: 1,
  slug: 1,
  intelligence: "$powerstats.intelligence",
  strength: "$powerstats.strength",
  speed: "$powerstats.speed",
  durability: "$powerstats.durability",
  power: "$powerstats.power",
  combat: "$powerstats.combat",
  gender: "$appearance.gender",
  race: "$appearance.race",
  height: "$appearance.height",
  weight: "$appearance.weight",
  eyeColor: "$appearance.eyeColor",
  hairColor: "$appearance.hairColor",
  publisher: "$biography.publisher",
  fullName: "$biography.fullName",
  placeOfBirth: "$biography.placeOfBirth",
  firstAppearance: "$biography.firstAppearance",
  image: "$images.md",
  */

  const CustomTableRow = function CustomTableRow({label, value}) {
    return (
      <TableRow className='border-0'>
        <TableCell className="font-bold p-2">{label}</TableCell>
        <TableCell className="p-2 text-wrap">{value || '-'}</TableCell>
      </TableRow>
    )
  };
  let powerstats = pick(data, ['strength', 'speed', 'power', 'durability', 'combat'])
  return (
      <Dialog open={open} onOpenChange={handleOpenChange} >
        <DialogContent className="pt-12 min-w-[660px]">
          <div className='grid grid-cols-1 grid-row-2 justify-items-center gap-y-4'>
            <div className='grid grid-cols-[240px_1fr] grid-row-1 gap-x-6'>
              <div className='grid grid-cols-1 grid-row-2 gap-y-4'>
                <div><img className="rounded max-w-[240px]" src={data.image}></img></div>
                <p className='text-center'>{data.name}</p>
              </div>

              <div className='details'>
                <div className='biograpy mb-4'>
                  <h4 className='text-lg'>Biography</h4>
                  <Table>
                    <TableBody>
                      <CustomTableRow label={'Original Name'} value={data.fullName}/>
                      <CustomTableRow label={'Place of Birth'} value={data.placeOfBirth}/>
                      <CustomTableRow label={'First Appearance'} value={data.firstAppearance}/>
                      <CustomTableRow label={'Publisher'} value={data.publisher}/>
                    </TableBody>
                  </Table>
                </div>
                <div className='appearance'>
                  <h4 className='text-lg'>Appearance</h4>
                  <Table>
                    <TableBody>
                      <CustomTableRow label={'Race'} value={data.race}/>
                      <CustomTableRow label={'Gender'} value={data.gender}/>
                      <CustomTableRow label={'Height'} value={data.height}/>
                      <CustomTableRow label={'Weight'} value={data.weight}/>
                    </TableBody>
                  </Table>
                </div>
              </div>

            </div>
            <div className='powerstats-charts w-[340px] col-span-1 grid justify-center'>
              <RadarChart data={powerstats} dataOpts={{label: 'Power Stats'}}/>
            </div>
          </div>
        </DialogContent>
      </Dialog>
  );
}

