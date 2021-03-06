import React, { useState, useEffect, useCallback } from 'react'

const Biga = () => {
    const [input, setInput] = useState({
        totaleFarina: 1000,
        percentualeBiga: 30,
        idratazioneBiga: 48,
        idratazioneAutolisi: 55,
        idratazioneImpasto: 65,
        idratazoneFinale: 70,
        percentualeSale: 2.0,
        percentualeOlio: 0.0,
        percentualeMalto: 1.0,
        conAutolisi: true,
    })

    const [output, setOutput] = useState({
        pesoDellaBiga: null,
        farinaNellaBiga: null,
        acquaNellaBiga: null,
        lievitoNellaBiga: null,
        lievitoSeccoNellaBiga: null,
        acquaTotale: null,
        acquaPerAutolisi: null,
        farinaPerAutolisi: null,
        farinaImpasto: null,
        acquaImpasto: null,
        acquaFinale: null,
        sale: null,
        olio: null,
        malto: null,
    })

    const calcola = useCallback(() => {
        const {
            totaleFarina,
            percentualeBiga,
            idratazioneBiga,
            idratazioneAutolisi,
            idratazioneImpasto,
            idratazoneFinale,
            percentualeSale,
            percentualeOlio,
            percentualeMalto,
            conAutolisi,
        } = input

        let farinaNellaBiga = Math.round((totaleFarina / 100) * percentualeBiga)

        let acquaNellaBiga = Math.round(
            (farinaNellaBiga / 100) * idratazioneBiga
        )

        let lievitoNellaBiga = Math.round(farinaNellaBiga / 100)

        let lievitoSeccoNellaBiga = Math.round((lievitoNellaBiga / 3) * 10) / 10

        let pesoDellaBiga = Math.round(farinaNellaBiga + acquaNellaBiga)

        let acquaTotale = Math.round((totaleFarina / 100) * idratazoneFinale)
        let farinaPerAutolisi = conAutolisi
            ? Math.round(totaleFarina - farinaNellaBiga)
            : 0
        let acquaPerAutolisi = conAutolisi
            ? Math.round((farinaPerAutolisi / 100) * idratazioneAutolisi)
            : 0
        let farinaImpasto = conAutolisi ? 0 : totaleFarina - farinaNellaBiga
        let acquaImpasto = Math.round(
            (totaleFarina / 100) * idratazioneImpasto -
                acquaNellaBiga -
                acquaPerAutolisi
        )
        let acquaFinale = Math.round(
            (totaleFarina / 100) * idratazoneFinale -
                acquaNellaBiga -
                acquaPerAutolisi -
                acquaImpasto
        )
        let sale = Math.round((totaleFarina / 100) * percentualeSale)
        let olio = Math.round((totaleFarina / 100) * percentualeOlio)
        let malto = Math.round((totaleFarina / 100) * percentualeMalto)

        setOutput({
            pesoDellaBiga,
            acquaNellaBiga,
            farinaNellaBiga,
            lievitoNellaBiga,
            lievitoSeccoNellaBiga,
            acquaTotale,
            acquaPerAutolisi,
            farinaPerAutolisi,
            farinaImpasto,
            acquaImpasto,
            acquaFinale,
            percentualeOlio,
            sale,
            olio,
            malto,
        })
    }, [input])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        if (type === 'checkbox') {
            setInput({
                ...input,
                [name]: checked,
            })
        } else {
            setInput({
                ...input,
                [name]:
                    ['percentualeSale', 'percentualeOlio'].indexOf(name) > -1
                        ? parseFloat(value)
                        : parseInt(value),
            })
        }
    }

    useEffect(() => {
        calcola()
    }, [input, calcola])

    return (
        <>
            <div className="p-2 flex flex-wrap">
                <Element
                    nome="totaleFarina"
                    label="Tot. farina"
                    value={input.totaleFarina}
                    handle={handleChange}
                    min={100}
                    max={null}
                />
                <Element
                    nome="percentualeBiga"
                    label="Perc. biga"
                    value={input.percentualeBiga}
                    handle={handleChange}
                    min={0}
                    max={100}
                />
                <Element
                    nome="idratazioneBiga"
                    label="Idro biga"
                    value={input.idratazioneBiga}
                    handle={handleChange}
                    min={0}
                    max={100}
                />
                <Element
                    disabled={!input.conAutolisi}
                    nome="idratazioneAutolisi"
                    label="Idro autolisi"
                    value={input.idratazioneAutolisi}
                    handle={handleChange}
                    min={0}
                    max={100}
                />
                <Element
                    nome="idratazioneImpasto"
                    label="Idro impasto"
                    value={input.idratazioneImpasto}
                    handle={handleChange}
                    min={0}
                    max={100}
                />
                <Element
                    nome="idratazoneFinale"
                    label="Idro finale"
                    value={input.idratazoneFinale}
                    handle={handleChange}
                    min={0}
                    max={100}
                />
                <Element
                    nome="percentualeSale"
                    label="Perc. sale"
                    value={input.percentualeSale}
                    handle={handleChange}
                    min={0}
                    max={5}
                    step="0.1"
                />
                <Element
                    nome="percentualeOlio"
                    label="Perc. olio"
                    value={input.percentualeOlio}
                    handle={handleChange}
                    min={0}
                    max={10}
                    step="0.1"
                />
                <Element
                    nome="percentualeMalto"
                    label="Perc. malto"
                    value={input.percentualeMalto}
                    handle={handleChange}
                    min={0}
                    max={5}
                    step="0.1"
                />
                <div className="flex my-2 w-1/3">
                    <label className="w-full">
                        <input
                            className="ml-2"
                            type="checkbox"
                            name="conAutolisi"
                            checked={input.conAutolisi}
                            onChange={handleChange}
                            min="100"
                        />{' '}
                        Con autolisi
                    </label>
                </div>
            </div>
            <div className="p-2">
                <p>
                    Farina totale: <strong>{input.totaleFarina} g</strong> |
                    Acqua totale: <strong>{output.acquaTotale} g</strong>
                </p>
                <p>&nbsp;</p>
                <p>
                    Peso della biga: <strong>{output.pesoDellaBiga} g</strong>
                </p>
                <p>
                    Acqua nella biga: <strong>{output.acquaNellaBiga} g</strong>
                </p>
                <p>
                    Farina nella biga:{' '}
                    <strong>{output.farinaNellaBiga} g</strong>
                </p>
                <p>
                    Lievito nella biga:{' '}
                    <strong>
                        {output.lievitoNellaBiga} g (oppure{' '}
                        {output.lievitoSeccoNellaBiga} g secco)
                    </strong>
                </p>
                <p>&nbsp;</p>
                <p>
                    Acqua per autolisi:{' '}
                    <strong>{output.acquaPerAutolisi} g</strong>
                </p>
                <p>
                    Farina per autolisi:{' '}
                    <strong>{output.farinaPerAutolisi} g</strong>
                </p>
                <p>&nbsp;</p>
                <p>
                    Farina impasto: <strong>{output.farinaImpasto} g</strong>
                </p>
                <p>
                    Acqua impasto: <strong>{output.acquaImpasto} g</strong>
                </p>
                <p>
                    Acqua finale: <strong>{output.acquaFinale} g</strong>
                </p>
                <p>&nbsp;</p>
                <p>
                    Sale: <strong>{output.sale} g</strong> | Olio:{' '}
                    <strong>{output.olio} g</strong> | Malto:{' '}
                    <strong>{output.malto} g</strong>
                </p>
            </div>
        </>
    )
}

const Element = ({
    nome,
    label,
    value,
    handle,
    min,
    max,
    step = 1,
    disabled = false,
}) => {
    return (
        <div className="flex flex-col justify-end my-2 w-1/3 pr-2">
            <label className="w-full mb-1">{label}</label>
            <input
                disabled={disabled}
                className="w-full p-2 border"
                type="number"
                name={nome}
                value={value}
                onChange={handle}
                min={min}
                max={max}
                step={step}
            />
        </div>
    )
}

export default Biga
