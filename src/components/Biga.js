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
            <div>
                Totale farina: 
                <input 
                    type="number" 
                    name="totaleFarina" 
                    value={input.totaleFarina} 
                    onChange={handleChange} 
                    min="100" />
            </div>
            <div>
                Percentuale biga: 
                <input 
                    type="number" 
                    name="percentualeBiga" 
                    value={input.percentualeBiga} 
                    onChange={handleChange} 
                    min="0"
                    max="100" />
            </div>
            <div>
                Idratazione biga: 
                <input 
                    type="number" 
                    name="idratazioneBiga" 
                    value={input.idratazioneBiga} 
                    onChange={handleChange} 
                    min="0"
                    max="100" />
            </div>
            <div>
                Idratazione autolisi: 
                <input 
                    type="number" 
                    name="idratazioneAutolisi" 
                    value={input.idratazioneAutolisi} 
                    onChange={handleChange} 
                    min="0"
                    max="100" />
            </div>
            <div>
                Idratazione impasto: 
                <input 
                    type="number" 
                    name="idratazioneImpasto" 
                    value={input.idratazioneImpasto} 
                    onChange={handleChange} 
                    min="0"
                    max="100" />
            </div>
            <div>
                Idratazione finale: 
                <input 
                    type="number" 
                    name="idratazoneFinale" 
                    value={input.idratazoneFinale} 
                    onChange={handleChange} 
                    min="0"
                    max="100" />
            </div>
            <div>
                Percentuale sale: 
                <input 
                    type="number" 
                    name="percentualeSale" 
                    value={input.percentualeSale} 
                    onChange={handleChange} 
                    min="0"
                    max="5" />
            </div>
            <div>
                <p>Peso della biga: { output.pesoDellaBiga } g</p>
                <p>Acqua nella biga: { output.acquaNellaBiga } g</p>
                <p>Farina nella biga: { output.farinaNellaBiga } g</p>
                <p></p>
                <p>Acqua totale: { output.acquaTotale } g</p>
                <p></p>
                <p>Acqua per autolisi: { output.acquaPerAutolisi } g</p>
                <p>Farina per autolisi: { output.farinaPerAutolisi } g</p>
                <p></p>
                <p>Acqua impasto: { output.acquaImpasto } g</p>
                <p>Acqua finale: { output.acquaFinale } g</p>
                <p></p>
                <p>Sale: { output.sale } g</p>
            </div>
        </>
    )
}

export default Biga