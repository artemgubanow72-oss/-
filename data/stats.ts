export interface Stat {
  value: number
  suffix: string
  label: string
  sublabel?: string
}

export const stats: Stat[] = [
  {
    value: 20,
    suffix: '+',
    label: 'лет',
    sublabel: 'на рынке',
  },
  {
    value: 500,
    suffix: '+',
    label: 'моделей',
    sublabel: 'в каталоге',
  },
  {
    value: 1500,
    suffix: '+',
    label: 'дилеров',
    sublabel: 'по России и СНГ',
  },
  {
    value: 2000,
    suffix: '',
    label: 'пар в день',
    sublabel: 'производительность',
  },
  {
    value: 99.8,
    suffix: '%',
    label: 'качество',
    sublabel: 'контроль ОТК',
  },
  {
    value: 1,
    suffix: ' день',
    label: 'отгрузка',
    sublabel: 'по всей России',
  },
]
