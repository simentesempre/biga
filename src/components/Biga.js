import React, {useState, useEffect, useCallback} from 'react'

const Biga = () => {

    const [input, setInput] = useState({
        totaleFarina: 1000,
        percentualeBiga: 30,
        idratazioneBiga: 48,
        idratazioneAutolisi: 55,
        idratazioneImpasto: 65,
        idratazoneFinale: 70,
        percentualeSale: 2
    })

    const [output, setOutput] = useState({
        pesoDellaBiga: null,
        farinaNellaBiga: null,
        acquaNellaBiga: null,
        acquaTotale: null,
        acquaPerAutolisi: null,
        farinaPerAutolisi: null,
        acquaImpasto: null,
        acquaFinale: null,
        sale: null
    })

    const calcola = useCallback(() => {

        const {
            totaleFarina,
            percentualeBiga,
            idratazioneBiga,
            idratazioneAutolisi,
            idratazioneImpasto,
            idratazoneFinale,
            percentualeSale
        } = input
        
        let pesoDellaBiga = Math.round( ( totaleFarina / 100 ) * percentualeBiga )
        let farinaNellaBiga = Math.round( pesoDellaBiga / ( ( idratazioneBiga / 100 ) + 1 ) )
        let acquaNellaBiga = Math.round( pesoDellaBiga - farinaNellaBiga )
        let acquaTotale = Math.round( ( totaleFarina / 100 ) * idratazoneFinale )
        let farinaPerAutolisi = Math.round( totaleFarina - farinaNellaBiga )
        let acquaPerAutolisi = Math.round( ( ( farinaPerAutolisi / 100 ) * idratazioneAutolisi ) )
        let acquaImpasto = Math.round( ( ( totaleFarina / 100 ) * idratazioneImpasto ) - acquaNellaBiga - acquaPerAutolisi ) 
        let acquaFinale = Math.round( ( ( totaleFarina / 100 ) * idratazoneFinale ) - acquaNellaBiga - acquaPerAutolisi - acquaImpasto )
        let sale =  Math.round( ( totaleFarina / 100 ) * percentualeSale ) 

        setOutput({
            pesoDellaBiga,
            acquaNellaBiga,
            farinaNellaBiga,
            acquaTotale,
            acquaPerAutolisi,
            farinaPerAutolisi,
            acquaImpasto,
            acquaFinale,
            sale
        })
        
    }, [input])

    const handleChange = e => {
        const { name, value } = e.target
        setInput({
            ...input,
            [name]: parseInt(value)
        })
    }

    useEffect(()=>{
        calcola()
    }, [input, calcola])

    useEffect(()=>{
        console.log({output})
    }, [output])

    return (
        <>
            <div className="p-2 flex flex-wrap">
                <Element nome="totaleFarina" label="Totale farina" value={input.totaleFarina} handle={handleChange} />
                <Element nome="percentualeBiga" label="Percentuale biga" value={input.percentualeBiga} handle={handleChange} />
                <Element nome="idratazioneBiga" label="Idratazione biga" value={input.idratazioneBiga} handle={handleChange} />
                <Element nome="idratazioneAutolisi" label="Idratazione autolisi" value={input.idratazioneAutolisi} handle={handleChange} />
                <Element nome="idratazioneImpasto" label="Idratazione impasto" value={input.idratazioneImpasto} handle={handleChange} />
                <Element nome="idratazoneFinale" label="Idratazione finale" value={input.idratazoneFinale} handle={handleChange} />
                <Element nome="percentualeSale" label="Percentuale sale" value={input.percentualeSale} handle={handleChange} />
            </div>
            <div className="p-2">
                <p>Peso della biga: <strong>{ output.pesoDellaBiga } g</strong></p>
                <p>Acqua nella biga: <strong>{ output.acquaNellaBiga } g</strong></p>
                <p>Farina nella biga: <strong>{ output.farinaNellaBiga } g</strong></p>
                <p>&nbsp;</p>
                <p>Acqua totale: <strong>{ output.acquaTotale } g</strong></p>
                <p>&nbsp;</p>
                <p>Acqua per autolisi: <strong>{ output.acquaPerAutolisi } g</strong></p>
                <p>Farina per autolisi:<strong>{ output.farinaPerAutolisi } g</strong></p>
                <p>&nbsp;</p>
                <p>Acqua impasto: <strong>{ output.acquaImpasto } g</strong></p>
                <p>Acqua finale: <strong>{ output.acquaFinale } g</strong></p>
                <p>&nbsp;</p>
                <p>Sale: <strong>{ output.sale } g</strong></p>
            </div>
        </>
    )
}

const Element = ({nome, label, value, handle}) => {
    return (
        <div className="flex flex-col my-2 w-6/12">
            <label className="w-full mb-1">{label}</label> 
            <input 
                className="w-full p-2 border"
                type="number" 
                name={nome} 
                value={value} 
                onChange={handle} 
                min="100" />
        </div>
    )
}

export default Biga